
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsAcademy7.Context;
using SportsAcademy7.Models;
using System.Text.RegularExpressions;

namespace SportsAcademy7.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MemberController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        // User rk = new User(); 
        public MemberController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }





        /// <summary>
        /// Get all member
        /// </summary>
        /// <returns></returns>
        // [Authorize]
        [HttpGet]

        public async Task<IActionResult> GetAllMember()
        {
            var member = await _authContext.Members.ToListAsync();
            return Ok(member);
        }



        //Get single member
        //  [Authorize]
        [HttpGet]
        [Route("{membername}")]
        // [ActionName("GetMember")]
        public async Task<IActionResult> GetMember([FromRoute] string membername)
        {
            var member = await _authContext.Members.FirstOrDefaultAsync(x => x.Membername == membername);
            if (member != null)
            {
                return Ok(member);
            }
            return NotFound("Member Not Found");
        }




        private readonly string[] bloodGroups = { "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" };
        private bool IsValidBloodGroup(string group)
        {
            foreach (string s in bloodGroups)
            {
                if (group == s) return true;
            }

            return false;
        }


        private string VerifyGender(string gender)
        {
            var allowedGenders = new List<string> { "male", "female", "other" };
            if (string.IsNullOrEmpty(gender))
            {
                return "empty";
            }
            else if (!allowedGenders.Contains(gender.ToLower()))
            {
                return "false";
            }
            else
            {
                return "true";
            }
        }
        private string VerifyAddress(string address)
        {
            if (string.IsNullOrEmpty(address))
            {
                return "empty";
            }
            else if (!Regex.IsMatch(address, @"^[a-zA-Z0-9'\.\-\s\,]+$"))
            {
                return "Invalid";
            }
            else
            {
                return "true";
            }

        }


        //Add Member
        // [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddMember([FromBody] Member member)
        {
            member.DobDate = DateTime.UtcNow.Date;
            member.Id = Guid.NewGuid();
            bool str = IsValidBloodGroup(Convert.ToString(member.BloodGroup));
            string gen = VerifyGender(Convert.ToString(member.Gender));
            string ad = VerifyAddress(Convert.ToString(member.Address));
            if (gen == "empty")
            {
                return NotFound("Gender is required");
            }
            if (ad == "empty")
            {
                return NotFound("Address is required");
            }

            else if (str == false || gen == "false" || ad == "Invalid")
            {
                if (str == false)
                {
                    return NotFound("Invalid BloodGroup found");
                }
                if (gen == "false")
                {
                    return NotFound("Gender is invalid");
                }
                if (ad == "invalid")
                {
                    return NotFound("Address is Invalid");
                }

            }
            else
            {
                await _authContext.Members.AddAsync(member);
                await _authContext.SaveChangesAsync();
            }

            return Ok();
        }




        //Update member info
        // [Authorize]
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateMember([FromRoute] Guid id, [FromBody] Member member)
        {
            var existingMember = await _authContext.Members.FirstOrDefaultAsync(x => x.Id == id);
            if (existingMember != null)
            {
                existingMember.Membername = member.Membername;
                existingMember.BloodGroup = member.BloodGroup;
                existingMember.DobDate = member.DobDate;
                existingMember.Address = member.Address;
                existingMember.Height = member.Height;
                existingMember.Weight = member.Weight;
                existingMember.MobilePhone = member.MobilePhone;
                existingMember.Age = member.Age;
                existingMember.Gender = member.Gender;
                existingMember.SportType = member.SportType;
                await _authContext.SaveChangesAsync();
                return Ok(existingMember);
            }
            return NotFound("Member Not Found");
        }




        //Delete member
        // [Authorize]
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteMember([FromRoute] Guid id)
        {
            var existingMember = await _authContext.Members.FirstOrDefaultAsync(x => x.Id == id);
            if (existingMember != null)
            {
                _authContext.Remove(existingMember);
                await _authContext.SaveChangesAsync();
                return Ok(existingMember);
            }
            return NotFound("Member Not Found");
        }



    }
}