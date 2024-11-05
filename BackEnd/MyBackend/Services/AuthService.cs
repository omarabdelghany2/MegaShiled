using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MyBackend.Models;
using MyBackend.Data;
using System.Linq;

namespace MyBackend.Services
{
    public class AuthService
    {
        private readonly AppDbContext _context;
        private string _secretKey;
        private DateTime _keyExpiration;

        public AuthService(AppDbContext context)
        {
            _context = context;
            GenerateNewSecretKey();
        }

        public string GenerateJwtToken(Admin admin, string secretKey)
        {
            // Create claims based on the admin object
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()), // Store the ID as a claim
                new Claim(ClaimTypes.Name, admin.Name),                    // Store the name as a claim
                new Claim(ClaimTypes.Email, admin.Email)                   // Store the email as a claim
            };

            // Define the security key and signing credentials using the provided secretKey
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the token
            var token = new JwtSecurityToken(
                issuer: "your_application_name", // Replace with your actual issuer if needed
                audience: "your_api_name",       // Replace with your actual audience if needed
                claims: claims,
                expires: DateTime.Now.AddMinutes(30), // Set the token expiration time
                signingCredentials: creds);

            // Return the token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public ClaimsPrincipal ValidateJwtToken(string token, string secretKey)
        {
            try
            {
                // Set up the token validation parameters
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    // Set the valid issuer and audience
                    ValidIssuer = "your_application_name",  // Must match the issuer from token creation
                    ValidAudience = "your_api_name",         // Must match the audience from token creation

                    // Set the signing key
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                
                // Validate the token and return the ClaimsPrincipal if valid
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken validatedToken);

                // Additional check for token type to ensure it's a JWT
                if (validatedToken is JwtSecurityToken jwtToken)
                {
                    // Optional: Check algorithm if needed
                    if (jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    {
                        return principal;
                    }
                }

                return null; // Invalid token
            }
            catch (Exception)
            {
                // Return null if token validation fails
                return null;
            }
        }

        public bool ValidateAdminCredentials(string email, string password)
        {
            // Find the admin in the database using Email and Password only
            var admin = _context.Admins.FirstOrDefault(a => a.Email == email && a.Password == password);
            
            // Return true if a matching admin is found; otherwise, false
            return admin != null;
        }


        public bool RegisterAdmin(string name, string email, string password)
        {
            if (_context.Admins.Any(a => a.Email == email))
            {
                return false;
            }

            var newAdmin = new Admin
            {
                Name = name,
                Email = email,
                Password = password // In production, consider hashing the password
            };

            _context.Admins.Add(newAdmin);
            _context.SaveChanges();
            return true;
        }

        public IEnumerable<Admin> GetAllAdmins()
        {
            return _context.Admins.ToList();
        }

        public bool DeleteAdminById(int id)
        {
            var admin = _context.Admins.Find(id);
            if (admin == null) return false;

            _context.Admins.Remove(admin);
            _context.SaveChanges();
            return true;
        }

        private void GenerateNewSecretKey()
        {
            using var rng = new RNGCryptoServiceProvider();
            var secretKeyBytes = new byte[32];
            rng.GetBytes(secretKeyBytes);
            _secretKey = Convert.ToBase64String(secretKeyBytes);
            _keyExpiration = DateTime.UtcNow.AddHours(1);
        }


        public Admin GetAdminByEmail(string email)
        {
            return _context.Admins.FirstOrDefault(a => a.Email == email); // Assuming you have Email property in Admin model
        }

    }
}
