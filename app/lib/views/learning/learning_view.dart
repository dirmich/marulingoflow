import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../controllers/learning_controller.dart';
import 'flashcard_widget.dart';

class LearningView extends GetView<LearningController> {
  const LearningView({super.key});

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      if (controller.isFinished.value) {
        return _buildFinishedView();
      }

      final currentWord = controller.words[controller.currentIndex.value];

      return Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.close),
            onPressed: () => Get.back(),
          ),
          title: Text(
            '${controller.currentIndex.value + 1} / ${controller.words.length}',
          ),
        ),
        body: Center(
          child: FlashcardWidget(
            word: currentWord.text,
            meaning: currentWord.meaning,
            phonetic: currentWord.phonetic,
            onReview: (quality) => controller.handleReview(quality),
          ),
        ),
      );
    });
  }

  Widget _buildFinishedView() {
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
              onPressed: () {
                controller.reset();
                Get.back();
              },
              child: const Text('대시보드로 돌아가기'),
            ),
          ],
        ),
      ),
    );
  }
}
