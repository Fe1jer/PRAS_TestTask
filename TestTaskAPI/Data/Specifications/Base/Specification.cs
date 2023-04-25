using System.Linq.Expressions;
using TestTaskAPI.Data.Interfaces;

namespace TestTaskAPI.Data.Specifications.Base
{
    public class Specification<T> : ISpecification<T>
    {
        public Specification() { }
        public Specification(Expression<Func<T, bool>> criteria)
        {
            this.Criteria = criteria;
        }

        public Expression<Func<T, bool>>? Criteria { get; }
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();
        public List<string> IncludeStrings { get; } = new List<string>();
        public List<Expression<Func<T, object>>> OrderByExpressions { get; private set; } = new List<Expression<Func<T, object>>>();
        public List<Expression<Func<T, object>>> OrderByDescendingExpressions { get; private set; } = new List<Expression<Func<T, object>>>();
        public List<Expression<Func<T, bool>>> WhereExpressions { get; private set; } = new List<Expression<Func<T, bool>>>();

        public ISpecification<T> AddPagination(int take = 0, int skip = 0)
        {
            Take = take;
            Skip = skip;

            return this;
        }

        public int Skip { get; set; }
        public int Take { get; set; }
        public bool IsNoTracking { get; set; } = false;

        public void AddOrdering(Expression<Func<T, object>> expression)
        {
            OrderByExpressions.Add(expression);
        }

        public void AddDescendingOrdering(Expression<Func<T, object>> expression)
        {
            OrderByDescendingExpressions.Add(expression);
        }

        public void AddInclude(Expression<Func<T, object>> includeExpression)
        {
            Includes.Add(includeExpression);
        }

        public void AddWhere(Expression<Func<T, bool>> selectExpression)
        {
            WhereExpressions.Add(selectExpression);
        }

        public void AddInclude(string includeString)
        {
            IncludeStrings.Add(includeString);
        }
    }
}
