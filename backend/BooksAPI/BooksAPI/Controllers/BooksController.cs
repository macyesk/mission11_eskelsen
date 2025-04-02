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

    [HttpPost("AddBook")]
    public IActionResult AddBook([FromBody] Book newBook) {
        _context.Books.Add(newBook);
        _context.SaveChanges();
        return Ok(newBook);
    }

    [HttpPut("UpdateBook/{bookId}")]
    public IActionResult UpdateBook(int bookId, [FromBody] Book updateBook){
        var existingBook = _context.Books.Find(bookId);
        existingBook.Title = updateBook.Title;
        existingBook.Author = updateBook.Author;
        existingBook.Publisher = updateBook.Publisher;
        existingBook.ISBN = updateBook.ISBN;
        existingBook.Classification = updateBook.Classification;
        existingBook.Category = updateBook.Category;
        existingBook.PageCount = updateBook.PageCount;
        existingBook.Price = updateBook.Price;

        _context.Books.Update(existingBook);
        _context.SaveChanges();
        return Ok(existingBook);
    }

    [HttpDelete("DeleteBook/{bookId}")]
    public IActionResult DeleteBook(int bookId) 
    {
        var book = _context.Books.Find(bookId);

        if (book ==null) {
            return NotFound(new {message = "Book not found"});
        }

        _context.Books.Remove(book);
        _context.SaveChanges();
        return NoContent();
    }

}