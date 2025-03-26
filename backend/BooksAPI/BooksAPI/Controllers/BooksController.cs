using BooksAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace BooksAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    private BookDbContext _context;

    public BooksController(BookDbContext temp)
    {
        _context = temp;
    }

    [HttpGet("AllBooks")]
    public IActionResult GetAllBooks(int pageHowMany = 5, int pageNum = 1, bool sortBy = false, [FromQuery] List<string>? categories = null)
    {
        var query = _context.Books.AsQueryable();

        if (categories != null && categories.Any())
        {
            query = query.Where(b => categories.Contains(b.Category));
        }

        var totalNumBooks = query.Count(); // Correct total count before pagination

        if (sortBy)
        {
            query = query.OrderBy(b => b.Title);
        }

        var result = query.Skip((pageNum - 1) * pageHowMany).Take(pageHowMany).ToList();

        var pageInfo = new
        {
            Books = result,
            TotalNumBooks = totalNumBooks
        };

        return Ok(pageInfo);
    }

    
    [HttpGet("GetProjectTypes")]
    public IActionResult GetProjectTypes()
    {
        var projectTypes = _context.Books.Select(p => p.Category).Distinct().ToList();
            
        return Ok(projectTypes);
    }
    
}