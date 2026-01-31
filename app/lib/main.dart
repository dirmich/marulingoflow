import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'core/theme.dart';
import 'views/dashboard/dashboard_view.dart';
import 'controllers/learning_controller.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
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
