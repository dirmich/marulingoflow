import 'package:get/get.dart';
import '../models/word.dart';

class LearningController extends GetxController {
  var words = <Word>[].obs;
  var currentIndex = 0.obs;
  var isFinished = false.obs;

  @override
  void onInit() {
    super.onInit();
    _fetchWords();
  }

  void _fetchWords() {
    // 임시 더미 데이터 (추후 API 연동)
    words.addAll([
      Word(id: 1, text: 'apple', meaning: '사과', phonetic: 'æpl'),
      Word(id: 2, text: 'banana', meaning: '바나나', phonetic: 'bəˈnænə'),
    ]);
  }

  void handleReview(int quality) {
    if (currentIndex.value < words.length - 1) {
      currentIndex.value++;
    } else {
      isFinished.value = true;
    }
  }

  void reset() {
    currentIndex.value = 0;
    isFinished.value = false;
  }
}
