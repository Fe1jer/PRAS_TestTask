using TestTaskAPI.Data.Entities;
using TestTaskAPI.Data.Specifications.Base;

namespace TestTaskAPI.Data.Specifications
{
    public class UsersSpecification : Specification<User>
    {
        public UsersSpecification() : base() { }

        public UsersSpecification WhereUserName(string username)
        {
            AddWhere(u => u.Username == username);
            return this;
        }
    }
}
