using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly BackendDbContext _context;

        public AddressController(BackendDbContext context)
        {
            _context = context;
        }

        // GET: api/addresses
       
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Address>>> GetUserAddresses()
        {
            var userId = Guid.Parse(User.FindFirst("sub")?.Value);
            return await _context.Addresses.Where(a => a.UserId == userId).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Address>> GetAddress(Guid id)
        {
            var address = await _context.Addresses.FindAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return address;
        }

        // POST: api/addresses
        
        [HttpPost]
        public async Task<ActionResult<Address>> CreateAddress([FromBody] Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserAddresses), new { id = address.Id }, address);
        }
    }
}
