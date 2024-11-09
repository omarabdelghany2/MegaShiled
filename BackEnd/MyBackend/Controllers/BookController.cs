using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Globalization; // For CultureInfo
using Microsoft.Extensions.Logging; // Ensure you have this using directive
using System.Linq;
using MyBackend.Services; // For AuthService

using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

[Route("api/bookings")]
[ApiController]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AuthService _authService;

    private const string AccountSid = "AC1213c5542a99879cf121e3f5a314793d";
    private const string AuthToken = "fb618063459554b417c64ca605767bcb";

    public BookingsController(AppDbContext context,AuthService authService)
    {
        _context = context;
        _authService = authService;
        TwilioClient.Init(AccountSid, AuthToken);
    }

        // GET: api/bookings
        [HttpGet]
        public async Task<ActionResult<BookResponse>> GetBookings()
        {
            var bookings = await _context.Bookings.ToListAsync(); // Fetch all bookings
            var response = new BookResponse
            {
                Count = bookings.Count, // Set the count of bookings
                Bookings = bookings     // Assign the list of bookings
            };

            return Ok(response); // Return the response object
        }

        // GET: api/bookings/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookingById(string id)
        {
            var booking = await _context.Bookings.FindAsync(id); // Find the booking by _id

            if (booking == null)
            {
                return NotFound($"Booking with ID {id} not found.");
            }

            return Ok(booking); // Return the found booking
        }

        // POST: api/bookings
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBooking([FromBody] Book booking)
        {
            if (booking == null)
            {
                return BadRequest("Booking data is required.");
            }

            // Log the received booking data
            // Console.WriteLine($"Received booking: {System.Text.Json.JsonSerializer.Serialize(booking)}");
            string messageContent = $"Megashield: تم تأكيد حجزك في {FormatBookingDateWithTime(booking.Date)}.";


            // string adminMessageContent = $"Megashield: حجز جديد. تاريخ: {FormatBookingDateWithTime(booking.Date)}.";
            // string adminMessageContent = $"Megashield: حجز جديد للعميل {booking.CustomerFname}.";




            Console.WriteLine(messageContent);

            // Save the new booking (with auto-generated _id and __v)
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // Send SMS notification to the customer
            SendSms("+15162724216", booking.CustomerPhone, messageContent); // Replace with your Twilio number and customer's phone
            // SendSms("+15162724216", "+201557348682", adminMessageContent); // This is admin message


            return CreatedAtAction(nameof(GetBookingById), new { id = booking._id }, booking);
        }



        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBooking(string id)
        {
            // Find the booking by ID
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound(); // Return 404 if booking not found
            }

            // Remove the booking from the context
            _context.Bookings.Remove(booking);
            
            // Save changes to the database
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on successful deletion
        }




        [HttpGet("dates")]
        public async Task<ActionResult<object>> GetAllBookingDates()
        {
            // Fetch all bookings
            var bookings = await _context.Bookings.ToListAsync();

            // Get the current date and time in Egypt (UTC+2)
            var egyptTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Egypt Standard Time");
            var now = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, egyptTimeZone);

            // Extract the full date and hour for each future booking
            var bookingDates = bookings.Select(b =>
            {
                // Attempt to parse the booking date using the specific format
                if (DateTime.TryParseExact(b.Date, "yyyy-MM-dd-HH", 
                    CultureInfo.InvariantCulture, DateTimeStyles.None, out var bookingDate))
                {
                    // Check if the booking date and time is in the future
                    if (bookingDate >= now) // Use >= to include current hour
                    {
                        return bookingDate.ToString("yyyy-MM-dd-HH"); // Format to "YYYY-MM-DD HH"
                    }
                }
                return null; // Handle any invalid date format gracefully
            })
            .Where(date => date != null) // Filter out nulls if any invalid dates were found
            .Distinct() // Ensure unique booking dates in the response
            .OrderBy(date => date); // Order the dates

            // Return JSON response with the desired format
            return Ok(new { dates = bookingDates }); // Wrap the result in an object with "dates" property
        }



        [HttpPost("complete/{id}")]
        public async Task<ActionResult<Book>> MarkBookingAsCompleted(string id, [FromBody] MarkBookingAsCompletedRequest request)
        {
            // Validate the token
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var principal = _authService.ValidateJwtToken(token, "MyS3cur3JWTSecr3tK3y$hG@84#oLZnP1LrMv");

            if (string.IsNullOrEmpty(token) || principal == null)
            {
                return Unauthorized(new { Message = "Invalid token" });
            }

            // Validate the request body
            if (request == null)
            {
                return BadRequest("Request body is required.");
            }

            // Find the booking by ID
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound($"Booking with ID {id} not found.");
            }

            // Update the isCompleted property based on the input
            booking.isCompleted = request.isCompleted;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok(booking); // Return the updated booking
        }


            // Twilio SMS function
        private void SendSms(string fromPhoneNumber, string toPhoneNumber, string messageContent)
        {
            var fullToPhoneNumber = "+2" + toPhoneNumber.TrimStart('+');
            var to = new PhoneNumber(fullToPhoneNumber);
            var from = new PhoneNumber(fromPhoneNumber);

            var message = MessageResource.Create(
                body: messageContent,
                from: from,
                to: to
            );

            Console.WriteLine($"SMS sent with SID: {message.Sid}");
        }


        private string FormatBookingDateWithTime(string date)
        {
            // Try to parse the date string
            if (DateTime.TryParseExact(date, "yyyy-MM-dd-HH", 
                CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime bookingDate))
            {
                // Format the date as "yyyy-MM-dd hh:mm tt" (12-hour format with AM/PM)
                var timeOfDay = bookingDate.Hour < 12 ? "صباحًا" : "مساءً";
                return $"{bookingDate:yyyy-MM-dd} الساعة {bookingDate:hh:mm} {timeOfDay}";
            }
            else
            {
                // If parsing fails, return a default message
                return "تاريخ غير صالح";
            }
        }


}
