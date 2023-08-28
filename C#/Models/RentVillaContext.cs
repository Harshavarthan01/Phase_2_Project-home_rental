using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RentVilla.Models;

public partial class RentVillaContext : DbContext
{
    public RentVillaContext()
    {
    }

    public RentVillaContext(DbContextOptions<RentVillaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ImageTable> ImageTables { get; set; }

    public virtual DbSet<PropertyTable> PropertyTables { get; set; }

    public virtual DbSet<UserTable> UserTables { get; set; }

    public virtual DbSet<WishlistTable> WishlistTables { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source = .\\SQLEXPRESS02; initial catalog = RentVilla; integrated security=SSPI; TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ImageTable>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK_IMG");

            entity.ToTable("image_table");

            entity.Property(e => e.ImageId).HasColumnName("image_id");
            entity.Property(e => e.Img1).HasColumnName("img_1");
            entity.Property(e => e.Img2).HasColumnName("img_2");
            entity.Property(e => e.Img3).HasColumnName("img_3");
            entity.Property(e => e.PropertyId).HasColumnName("property_id");

            entity.HasOne(d => d.Property).WithMany(p => p.ImageTables)
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("FK_PROP_IMG");
        });

        modelBuilder.Entity<PropertyTable>(entity =>
        {
            entity.HasKey(e => e.PropertyId).HasName("PK_PROPERTY");

            entity.ToTable("property_table");

            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.Address).HasColumnName("address");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasColumnName("city");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.FurnishedStatus)
                .HasMaxLength(25)
                .HasColumnName("furnished_status");
            entity.Property(e => e.NumberOfBhk).HasColumnName("number_of_bhk");
            entity.Property(e => e.NumberOfFloor).HasColumnName("number_of_floor");
            entity.Property(e => e.Pincode).HasColumnName("pincode");
            entity.Property(e => e.PostedDate)
                .HasColumnType("date")
                .HasColumnName("posted_date");
            entity.Property(e => e.PropertyName)
                .HasMaxLength(50)
                .HasColumnName("property_name");
            entity.Property(e => e.RentAmount)
                .HasColumnType("decimal(9, 2)")
                .HasColumnName("rent_amount");
            entity.Property(e => e.Status)
                .HasMaxLength(10)
                .HasColumnName("status");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.PropertyTables)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PROPERTY_OWNER");
        });

        modelBuilder.Entity<UserTable>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK_USER");

            entity.ToTable("user_table");

            entity.HasIndex(e => e.Email, "UQ__user_tab__AB6E6164B08E8780").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(20)
                .HasColumnName("password");
            entity.Property(e => e.Phone).HasColumnName("phone");
            entity.Property(e => e.UserName)
                .HasMaxLength(30)
                .HasColumnName("user_name");
            entity.Property(e => e.UserRole)
                .HasMaxLength(10)
                .HasColumnName("user_role");
        });

        modelBuilder.Entity<WishlistTable>(entity =>
        {
            entity.HasKey(e => e.WishlistId).HasName("PK_WISH");

            entity.ToTable("wishlist_table");

            entity.HasIndex(e => new { e.PropertyId, e.UserId }, "UNQ_WISH").IsUnique();

            entity.Property(e => e.WishlistId).HasColumnName("wishlist_id");
            entity.Property(e => e.PropertyId).HasColumnName("property_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Property).WithMany(p => p.WishlistTables)
                .HasForeignKey(d => d.PropertyId)
                .HasConstraintName("FK_PROP_WISH");

            entity.HasOne(d => d.User).WithMany(p => p.WishlistTables)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_USER_WISH");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
