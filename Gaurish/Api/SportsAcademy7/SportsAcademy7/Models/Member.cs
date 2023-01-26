using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SportsAcademy7.Models
{
    public class Member
    {
        [Key]

        public Guid Id { get; set; }

        [RegularExpression(@"^[a-zA-Z ]+$", ErrorMessage = "Name must contain only letters and spaces")]
        [StringLength(15, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 15 characters")]
        [Required(ErrorMessage = "Name is required")]
        public string Membername { get; set; }


        [Required(ErrorMessage = "BloodGroup is required")]
        public string BloodGroup { get; set;}


        [Required(ErrorMessage = "DobDate is required")]
        //[DataType(DataType.DateOnly)]
        //[Range(typeof(DateOnly), "1/1/1988", "12/31/2022",
        // ErrorMessage = "Value for {0} must be between {1} and {2}")]
        //public DateOnly DobDate { get; set;}

        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Range(typeof(DateTime), "1988-01-01", "2022-12-31", ErrorMessage = "Value for {0} must be between {1} and {2}")]
        public DateTime DobDate { get; set; }


        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }


        [Range(minimum: 3.28084, maximum: 8.2021, ErrorMessage = "Height must be between 1.0 and 2.5 meters")]
        [Required(ErrorMessage = "Height is required")]
        public double Height { get; set; } = 3.28084;


        [Range(45, 120)]
        [Required(ErrorMessage = "Weight is required")]
        public double Weight { get; set; } = 45;


        [Phone]
        [Required(ErrorMessage = "MobilePhone is required")]
        public string  MobilePhone { get; set; }

        [Range(16, 35)]
        [Required(ErrorMessage = "Age is required")]
        public int Age { get; set; } = 16;


        [Required(ErrorMessage = "Gender is required")]
        public string Gender { get; set; }


        [Required(ErrorMessage = "SportType is required")]
        public string SportType { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime CreatedAt { get; set; } 

        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime UpdatedAt { get; set; } 




    }
}
