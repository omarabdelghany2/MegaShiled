using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBackend.Data;
using MyBackend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
}
