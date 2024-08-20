using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class ProductService
    {
        private readonly BackendDbContext _context;

        public ProductService(BackendDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }
    }

}
