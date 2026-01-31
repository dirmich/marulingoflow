import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'core/theme.dart';
import 'views/dashboard/dashboard_view.dart';
import 'controllers/learning_controller.dart';

void main() {
  runApp(const LingoFlowApp());
}

class LingoFlowApp extends StatelessWidget {
  const LingoFlowApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Lingo-Flow',
      theme: AppTheme.darkTheme,
      debugShowCheckedModeBanner: false,
      initialBinding: BindingsBuilder(() {
        Get.lazyPut(() => LearningController());
      }),
      home: const DashboardView(),
    );
  }
}
