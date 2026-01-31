import 'package:flutter/material.dart';

class AppTheme {
  static const Color primaryBlue = Color(0xFF2563EB);
  static const Color bgDark = Color(0xFF020617);
  static const Color cardDark = Color(0xFF0F172A);
  static const Color textMain = Color(0xFFF1F5F9);
  static const Color textMuted = Color(0xFF94A3B8);

  static final ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: bgDark,
    primaryColor: primaryBlue,
    cardColor: cardDark,
    textTheme: const TextTheme(
      headlineMedium: TextStyle(
        color: textMain,
        fontWeight: FontWeight.bold,
        fontSize: 24,
      ),
      bodyMedium: TextStyle(color: textMain, fontSize: 16),
      labelMedium: TextStyle(color: textMuted, fontSize: 14),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: bgDark,
      elevation: 0,
      titleTextStyle: TextStyle(
        color: textMain,
        fontWeight: FontWeight.bold,
        fontSize: 20,
      ),
    ),
  );
}
