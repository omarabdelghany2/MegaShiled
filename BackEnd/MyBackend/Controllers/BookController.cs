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

[Route("api/bookings")]
[ApiController]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingsController(AppDbContext context)
    {
        _context = context;
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
        Console.WriteLine($"Received booking: {System.Text.Json.JsonSerializer.Serialize(booking)}");

        // Save the new booking (with auto-generated _id and __v)
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

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



}
