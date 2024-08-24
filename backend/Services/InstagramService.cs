namespace Backend.Services
{
    using System;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.Extensions.Configuration;
    using Newtonsoft.Json.Linq;

    public class InstagramService
    {
        private readonly HttpClient _httpClient;
        private readonly string _accessToken;

        public InstagramService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _accessToken = configuration["Instagram:AccessToken"];
        }

        public async Task<JArray> GetLatestPostsAsync(int count = 3)
        {
            var url = $"https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token={_accessToken}";

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception("Error fetching Instagram posts");
            }

            var content = await response.Content.ReadAsStringAsync();
            var data = JObject.Parse(content)["data"] as JArray;

            return new JArray(data.Take(count));
        }
    }

}
