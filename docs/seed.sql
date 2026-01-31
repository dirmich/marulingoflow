-- Initial Language Data
INSERT INTO languages (code, name) VALUES ('ko', 'Korean') ON CONFLICT (code) DO NOTHING;
INSERT INTO languages (code, name) VALUES ('en', 'English') ON CONFLICT (code) DO NOTHING;
INSERT INTO languages (code, name) VALUES ('ja', 'Japanese') ON CONFLICT (code) DO NOTHING;

-- Sample Words (English -> Korean)
INSERT INTO words (language_id, text, meaning, level, category) VALUES 
((SELECT id FROM languages WHERE code = 'en'), 'Apple', '사과', 'A1', 'food'),
((SELECT id FROM languages WHERE code = 'en'), 'Book', '책', 'A1', 'object'),
((SELECT id FROM languages WHERE code = 'en'), 'Run', '달리다', 'A1', 'verb'),
((SELECT id FROM languages WHERE code = 'en'), 'Happy', '행복한', 'A1', 'adjective');

-- Sample Words (Japanese -> Korean)
INSERT INTO words (language_id, text, phonetic, meaning, level, category) VALUES 
((SELECT id FROM languages WHERE code = 'ja'), 'こんにちは', 'Konnichiwa', '안녕하세요', 'N5', 'greeting'),
((SELECT id FROM languages WHERE code = 'ja'), 'ありがとう', 'Arigatou', '감사합니다', 'N5', 'greeting'),
((SELECT id FROM languages WHERE code = 'ja'), '食べる', 'Taberu', '먹다', 'N5', 'verb'),
((SELECT id FROM languages WHERE code = 'ja'), '猫', 'Neko', '고양이', 'N5', 'animal');
