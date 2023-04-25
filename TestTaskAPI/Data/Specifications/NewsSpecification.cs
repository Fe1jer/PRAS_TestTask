using TestTaskAPI.Data.Entities;
using TestTaskAPI.Data.Specifications.Base;

namespace TestTaskAPI.Data.Specifications
{
    public class NewsSpecification : Specification<News>
    {
        public NewsSpecification() : base() { }

        public NewsSpecification AddOrderingByRelevance()
        {
            AddDescendingOrdering(n => n.Id);
            return this;
        }
    }
}
