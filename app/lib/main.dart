import 'package:flutter/material.dart';
import 'core/theme.dart';
import 'views/dashboard/dashboard_view.dart';

void main() {
  runApp(const LingoFlowApp());
}

class LingoFlowApp extends StatelessWidget {
  const LingoFlowApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lingo-Flow',
      theme: AppTheme.darkTheme,
      debugShowCheckedModeBanner: false,
      home: const DashboardView(),
    );
  }
}
