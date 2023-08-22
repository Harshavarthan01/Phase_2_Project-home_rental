using Microsoft.EntityFrameworkCore;
using RentVilla.Models;
using RentVilla.Services;
using RentVilla.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RentVillaContext>(
    optionsAction: options => options.UseSqlServer(
        builder.Configuration.GetConnectionString(
            "SQLServerConnection")));

builder.Services.AddScoped<IProperty, PropertyService>();
builder.Services.AddScoped<IUser, UserService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
