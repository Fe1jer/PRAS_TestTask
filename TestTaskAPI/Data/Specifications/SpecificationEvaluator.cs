using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TestTaskAPI.Data.Entities.Base;
using TestTaskAPI.Data.Interfaces;

namespace TestTaskAPI.Data.Specifications
{
    internal static class SpecificationEvaluator
    {
        internal static IQueryable<T> ApplySpecification<T>(IQueryable<T> baseQuery, ISpecification<T> specification) where T : Entity
        {
            var query = baseQuery;

            if (specification.Criteria != null)
            {
                query = query.Where(specification.Criteria);
            }

            query = specification.Includes.Aggregate(query, (current, include) => current.Include(include));

            var a = query.Expression.Type;
            query = AddOrdering(query, specification);
            query = specification.IncludeStrings.Aggregate(query, (current, include) => current.Include(include));
            query = specification.WhereExpressions.Aggregate(query, (current, expression) => current.Where(expression));
            query = AddPagination(query, specification);

            if (specification.IsNoTracking)
            {
                query.AsNoTracking();
            }

            return query;
        }

        private static IQueryable<T> AddPagination<T>(IQueryable<T> query, ISpecification<T> specification)
        {
            if (specification.Skip > 0)
            {
                query = query.Skip(specification.Skip);
            }
            if (specification.Take > 0)
            {
                query = query.Take(specification.Take);
            }

            return query;
        }

        private static IQueryable<T> AddOrderBy<T>(IQueryable<T> query, List<Expression<Func<T, object>>> orderByExpressions)
        {
            var count = orderByExpressions.Count;

            for (int i = 0; i < count; ++i)
            {
                if (query is IOrderedQueryable<T> orderedQuery)
                {
                    query = orderedQuery.ThenBy(orderByExpressions[i]);
                }
                else
                {
                    query = query.OrderBy(orderByExpressions[i]);
                }
            }

            return query;
        }

        private static IQueryable<T> AddOrderByDescending<T>(IQueryable<T> query, List<Expression<Func<T, object>>> orderByDescendingExpressions)
        {
            var count = orderByDescendingExpressions.Count;

            for (int i = 0; i < count; ++i)
            {
                if (query is IOrderedQueryable<T> orderedQuery)
                {
                    query = orderedQuery.ThenByDescending(orderByDescendingExpressions[i]);
                }
                else
                {
                    query = query.OrderByDescending(orderByDescendingExpressions[i]);
                }
            }

            return query;
        }

        private static IQueryable<T> AddOrdering<T>(IQueryable<T> query, ISpecification<T> specification)
        {
            if (specification.OrderByDescendingExpressions != null)
            {
                query = AddOrderByDescending(query, specification.OrderByDescendingExpressions);
            }
            if (specification.OrderByExpressions != null)
            {
                query = AddOrderBy(query, specification.OrderByExpressions);
            }

            return query;
        }
    }
}
