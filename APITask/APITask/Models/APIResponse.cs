using System.Net;

namespace APITask;

public class APIResponse
{
    public bool isSuccess { get; set; } = true;
    public HttpStatusCode StatusCode { get; set; }
    public List<string> ErrorMessages { get; set; }
    public object Result { get; set; }


}

