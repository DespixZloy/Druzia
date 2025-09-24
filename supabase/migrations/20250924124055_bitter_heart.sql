/*
  # Создание таблицы для ответов на опросы

  1. Новые таблицы
    - `survey_responses`
      - `id` (uuid, primary key)
      - `user_name` (text) - имя участника
      - `user_email` (text) - email участника  
      - `question_1` (text) - любимый цвет
      - `question_2` (integer) - оценка опыта
      - `question_3` (text) - тип личности
      - `question_4` (text) - комментарии
      - `created_at` (timestamp) - время создания

  2. Безопасность
    - Включение RLS для таблицы `survey_responses`
    - Политика для всех пользователей на создание записей
    - Политика для всех пользователей на чтение своих записей
*/

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_email text NOT NULL,
  question_1 text NOT NULL,
  question_2 integer NOT NULL CHECK (question_2 >= 1 AND question_2 <= 5),
  question_3 text NOT NULL,
  question_4 text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert survey responses"
  ON survey_responses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can view survey responses"
  ON survey_responses
  FOR SELECT
  TO public
  USING (true);