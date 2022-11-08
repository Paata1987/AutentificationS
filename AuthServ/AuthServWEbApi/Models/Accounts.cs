namespace AuthServWEbApi.Models
{
    public class Accounts
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public Role[] Roles { get; set; }
    }


    public enum Role
    {
        User,
        Admin,
    }


}
