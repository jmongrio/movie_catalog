namespace backend.Models.Response
{
    public class GeneralResponse<T> where T : class
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public T? Object { get; set; }
    }
}
