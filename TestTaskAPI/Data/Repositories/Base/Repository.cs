using TestTaskAPI.Data.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TestTaskAPI.Data.Interfaces.Repositories.Base;
using TestTaskAPI.Data.Entities.Base;
using TestTaskAPI.Data.Interfaces;

namespace TestTaskAPI.Data.Repositories.Base
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected ApplicationDbContext Context { get; set; }
        private DbSet<T> EntitySet => Context.Set<T>();

        public Repository(ApplicationDbContext appDBContext)
        {
            Context = appDBContext;
        }

        public async Task AddAsync(T entity)
        {
            await Context.AddAsync(entity);
            await Context.SaveChangesAsync();
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>> predicate)
        {
            return await EntitySet.Where(predicate).CountAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            EntitySet.Remove(entity);
            await Context.SaveChangesAsync();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await EntitySet.ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await EntitySet.FindAsync(id);
        }

        public async Task<T?> GetByIdAsync(int id, ISpecification<T> specification)
        {
            var all = await GetAllAsync(specification);

            return all.FirstOrDefault(it => it.Id == id);
        }

        public async Task UpdateAsync(T entity)
        {
            Context.Entry(entity).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        }

        public async Task<List<T>> GetAllAsync(ISpecification<T> specification)
        {
            return await ApplySpecification(specification).ToListAsync();
        }

        protected IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator.ApplySpecification(Context.Set<T>().AsQueryable(), spec);
        }
    }
}
