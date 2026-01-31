import 'package:flutter/material.dart';
import '../../core/theme.dart';

class FlashcardWidget extends StatefulWidget {
  final String word;
  final String meaning;
  final String? phonetic;
  final Function(int) onReview;

  const FlashcardWidget({
    super.key,
    required this.word,
    required this.meaning,
    this.phonetic,
    required this.onReview,
  });

  @override
  State<FlashcardWidget> createState() => _FlashcardWidgetState();
}

class _FlashcardWidgetState extends State<FlashcardWidget> {
  bool _isFlipped = false;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        GestureDetector(
          onTap: () => setState(() => _isFlipped = !_isFlipped),
          child: AnimatedSwitcher(
            duration: const Duration(milliseconds: 500),
            transitionBuilder: (Widget child, Animation<double> animation) {
              final rotate = Tween(begin: 3.14, end: 0.0).animate(animation);
              return AnimatedBuilder(
                animation: rotate,
                child: child,
                builder: (context, child) {
                  return Transform(
                    transform: Matrix4.rotationY(rotate.value),
                    alignment: Alignment.center,
                    child: child,
                  );
                },
              );
            },
            child: _isFlipped ? _buildBack() : _buildFront(),
          ),
        ),
        const SizedBox(height: 48),
        if (_isFlipped) _buildActionButtons(),
      ],
    );
  }

  Widget _buildFront() {
    return Container(
      key: const ValueKey(true),
      width: 300,
      height: 400,
      decoration: BoxDecoration(
        color: AppTheme.cardDark,
        borderRadius: BorderRadius.circular(30),
        border: Border.all(
          color: Colors.white.withValues(alpha: 0.1),
          width: 2,
        ),
        border: Border.all(color: Colors.white.withOpacity(0.1), width: 2),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            'WORD',
            style: TextStyle(color: AppTheme.textMuted, letterSpacing: 2),
          ),
          const SizedBox(height: 20),
          Text(
            widget.word,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 40,
              fontWeight: FontWeight.w900,
            ),
          ),
          if (widget.phonetic != null) ...[
            const SizedBox(height: 10),
            Text(
              '[${widget.phonetic}]',
              style: const TextStyle(color: AppTheme.textMuted, fontSize: 18),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildBack() {
    return Transform(
      transform: Matrix4.rotationY(3.14),
      alignment: Alignment.center,
      child: Container(
        key: const ValueKey(false),
        width: 300,
        height: 400,
        decoration: BoxDecoration(
          color: Colors.blue[900],
          borderRadius: BorderRadius.circular(30),
          border: Border.all(color: Colors.blue[600]!, width: 2),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'MEANING',
              style: TextStyle(color: Colors.white70, letterSpacing: 2),
            ),
            const SizedBox(height: 20),
            Text(
              widget.meaning,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 32,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButtons() {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      alignment: WrapAlignment.center,
      children: List.generate(
        6,
        (index) => ActionChip(
          label: Text(
            'Q$index',
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          backgroundColor: AppTheme.cardDark,
          onPressed: () {
            widget.onReview(index);
            setState(() => _isFlipped = false);
          },
        ),
      ),
    );
  }
}
