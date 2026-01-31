import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'core/theme.dart';
import 'views/dashboard/dashboard_view.dart';
import 'controllers/learning_controller.dart';

void main() {
  runApp(const MaruLingoFlowApp());
}

class MaruLingoFlowApp extends StatelessWidget {
  const MaruLingoFlowApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Maru LingoFlow',
      theme: AppTheme.darkTheme,
      debugShowCheckedModeBanner: false,
      initialBinding: BindingsBuilder(() {
        Get.lazyPut(() => LearningController());
      }),
      home: const DashboardView(),
    );
  }
}
