using Microsoft.IdentityModel.Tokens;

namespace AuthCommon
{
    public class AuthOptions
    {
        public string Issuer { get; set; } //who created token 

        public string Audience { get; set; } //tokens target

        public string Secret { get; set; } //secret key of symetric encoding

        public int TokenLifeTime { get; set; } //tokens validate lifecycles in minutse

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret))
        }
    }
}