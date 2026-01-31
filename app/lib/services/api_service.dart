import 'package:dio/dio.dart';

class ApiService {
  static final Dio _dio = Dio(
    BaseOptions(
      baseUrl: 'http://localhost:8000', // 에뮬레이터 개발 시 10.0.2.2 혹은 IP 주소 사용 고려
      connectTimeout: const Duration(seconds: 5),
      receiveTimeout: const Duration(seconds: 3),
    ),
  );

  static Dio get dio {
    // 여기에 JWT 토큰 추가 인터셉터 로직 구현 예정
    return _dio;
  }

  static Future<Response> get(
    String path, {
    Map<String, dynamic>? queryParameters,
  }) async {
    return await dio.get(path, queryParameters: queryParameters);
  }

  static Future<Response> post(String path, {dynamic data}) async {
    return await dio.post(path, data: data);
  }
}
