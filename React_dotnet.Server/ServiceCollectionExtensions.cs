using React_dotnet.Server.Dtos.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
namespace React_dotnet.Server
{
    public static class ServiceCollectionExtensions
    {
        //Extension method
        public static IServiceCollection AddAuthenticationServices(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtConfigSection = configuration.GetSection(nameof(JwtOptions));
            services.Configure<JwtOptions>(jwtConfigSection);
            //Options pattern, inject
            var jwtConfig = jwtConfigSection.Get<JwtOptions>() ?? new JwtOptions(); //?? ha a bal oldal 0, akkor a jobb oldal

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = jwtConfig.Issuer,
                        ValidAudience = jwtConfig.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Key))

                    };
                });
            services.AddAuthorization();
            return services;
        }
    }
}
