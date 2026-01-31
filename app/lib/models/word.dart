class Word {
  final int id;
  final String text;
  final String meaning;
  final String? phonetic;

  Word({
    required this.id,
    required this.text,
    required this.meaning,
    this.phonetic,
  });

  factory Word.fromJson(Map<String, dynamic> json) {
    return Word(
      id: json['id'],
      text: json['text'],
      meaning: json['meaning'],
      phonetic: json['phonetic'],
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'text': text, 'meaning': meaning, 'phonetic': phonetic};
  }
}
