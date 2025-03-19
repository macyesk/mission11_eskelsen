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
    public IActionResult GetAllBooks(int pageHowMany = 5, int pageNum = 1, bool sortBy = false)
    {
        var result = _context.Books.Skip((pageNum - 1) * pageHowMany).Take(pageHowMany).ToList();
        
        if (sortBy)
        {
            result = _context.Books.OrderBy(b => b.Title).Skip((pageNum - 1) * pageHowMany).Take(pageHowMany).ToList();
        }
        
        var totalNumBooks = _context.Books.Count();

        var pageInfo = new
        {
            Books = result,
            TotalNumBooks = totalNumBooks
        };

        return Ok(pageInfo);
    }
    
    
}