using AutoMapper;

namespace APITask;

public class MappingConfig : Profile
{
    public MappingConfig()
    {
        CreateMap<CreateUserDTO, User>();
        CreateMap<Category, ViewCategoryDTO>();
        CreateMap<Expense, ViewExpenseDTO>()
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category));
        CreateMap<CreateExpenseDTO, Expense>();
        CreateMap<UpdateExpenseDTO, Expense>();

    }


}
