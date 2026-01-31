import 'package:flutter/material.dart';
import '../../models/word.dart';
import 'flashcard_widget.dart';

class LearningView extends StatefulWidget {
  const LearningView({super.key});

  @override
  State<LearningView> createState() => _LearningViewState();
}

class _LearningViewState extends State<LearningView> {
  final List<Word> _dummyWords = [
    Word(id: 1, text: 'apple', meaning: '사과', phonetic: 'æpl'),
    Word(id: 2, text: 'banana', meaning: '바나나', phonetic: 'bəˈnænə'),
  ];

  int _currentIndex = 0;
  bool _isFinished = false;

  void _handleReview(int quality) {
    if (_currentIndex < _dummyWords.length - 1) {
      setState(() {
        _currentIndex++;
      });
    } else {
      setState(() {
        _isFinished = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isFinished) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(
                Icons.check_circle_outline,
                color: Colors.green,
                size: 80,
              ),
              const SizedBox(height: 20),
              const Text(
                '학습 완료!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 10),
              const Text(
                '오늘의 모든 단어를 복습했습니다.',
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 30),
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('대시보드로 돌아가기'),
              ),
            ],
          ),
        ),
      );
    }

    final currentWord = _dummyWords[_currentIndex];

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text('${_currentIndex + 1} / ${_dummyWords.length}'),
      ),
      body: Center(
        child: FlashcardWidget(
          word: currentWord.text,
          meaning: currentWord.meaning,
          phonetic: currentWord.phonetic,
          onReview: _handleReview,
        ),
      ),
    );
  }
}
