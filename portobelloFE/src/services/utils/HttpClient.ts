import APIError from '../../errors/APIError';

interface RequestOptions<T = unknown> {
  body?: T;
  headers?: Record<string, string>;
}

interface InternalRequestOptions<T = unknown> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: T;
  headers?: Record<string, string>;
}

class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get<TResponse = unknown>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.makeRequest<TResponse>(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post<TBody = unknown, TResponse = unknown>(
    path: string,
    options?: RequestOptions<TBody>,
  ): Promise<TResponse> {
    return this.makeRequest<TResponse>(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put<TBody = unknown, TResponse = unknown>(
    path: string,
    options?: RequestOptions<TBody>,
  ): Promise<TResponse> {
    return this.makeRequest<TResponse>(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete<TResponse = unknown>(path: string, options?: RequestOptions): Promise<TResponse> {
    return this.makeRequest<TResponse>(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }

  private async makeRequest<TResponse = unknown>(
    path: string,
    options: InternalRequestOptions,
  ): Promise<TResponse> {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers,
    });

    const contentType = response.headers.get('Content-Type');
    let responseBody: unknown = null;

    if (contentType?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody as TResponse;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
