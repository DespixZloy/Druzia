import React, { useState } from 'react';
import { CheckCircle, Heart, Sparkles } from 'lucide-react';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import AnimatedButton from './components/AnimatedButton';
import RatingInput from './components/RatingInput';
import LoadingSpinner from './components/LoadingSpinner';
import { supabase, type SurveyResponse } from './lib/supabase';

type FormData = Omit<SurveyResponse, 'id' | 'created_at'>;

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_email: '',
    question_1: '',
    question_2: 0,
    question_3: '',
    question_4: ''
  });

  const totalSteps = 5;

  const updateFormData = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const submitSurvey = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('survey_responses')
        .insert([formData]);

      if (error) throw error;
      
      setIsCompleted(true);
    } catch (error) {
      console.error('Ошибка при отправке опроса:', error);
      alert('Произошла ошибка при отправке опроса. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.user_name.trim() !== '';
      case 2:
        return formData.user_email.trim() !== '' && formData.user_email.includes('@');
      case 3:
        return formData.question_1 !== '';
      case 4:
        return formData.question_2 > 0;
      case 5:
        return formData.question_3 !== '';
      default:
        return true;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="text-center space-y-6 animate-in fade-in duration-1000">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            Спасибо за участие! 
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Ваши ответы успешно сохранены. Мы ценим ваше мнение!
          </p>
          <div className="flex justify-center gap-4 text-2xl animate-pulse">
            <Heart className="text-pink-500" />
            <Sparkles className="text-yellow-500" />
            <Heart className="text-pink-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Опросник о Ваших предпочтениях
          </h1>
          <p className="text-gray-600 text-lg">
            Поделитесь своим мнением с нами
          </p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <div className="relative min-h-[400px]">
          {/* Шаг 1: Имя */}
          <QuestionCard isActive={currentStep === 1}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Как Вас зовут?
            </h2>
            <input
              type="text"
              value={formData.user_name}
              onChange={(e) => updateFormData('user_name', e.target.value)}
              placeholder="Введите ваше имя"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-300 text-lg"
              autoFocus
            />
          </QuestionCard>

          {/* Шаг 2: Email */}
          <QuestionCard isActive={currentStep === 2}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Ваш email адрес
            </h2>
            <input
              type="email"
              value={formData.user_email}
              onChange={(e) => updateFormData('user_email', e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-300 text-lg"
            />
          </QuestionCard>

          {/* Шаг 3: Любимый цвет */}
          <QuestionCard isActive={currentStep === 3}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Какой ваш любимый цвет?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Синий', 'Красный', 'Зеленый', 'Фиолетовый', 'Оранжевый', 'Розовый'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => updateFormData('question_1', color)}
                  className={`
                    px-6 py-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105
                    ${formData.question_1 === color 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                      : 'border-gray-200 hover:border-indigo-300'
                    }
                  `}
                >
                  {color}
                </button>
              ))}
            </div>
          </QuestionCard>

          {/* Шаг 4: Рейтинг */}
          <QuestionCard isActive={currentStep === 4}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Оцените ваш опыт использования веб-сайтов
            </h2>
            <p className="text-gray-600 text-center mb-4">
              1 - очень плохо, 5 - отлично
            </p>
            <RatingInput
              value={formData.question_2}
              onChange={(value) => updateFormData('question_2', value)}
            />
            {formData.question_2 > 0 && (
              <p className="text-center text-indigo-600 font-medium animate-in fade-in duration-300">
                Вы выбрали: {formData.question_2} звезд
              </p>
            )}
          </QuestionCard>

          {/* Шаг 5: Тип личности и комментарии */}
          <QuestionCard isActive={currentStep === 5}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Опишите себя одним словом
            </h2>
            <select
              value={formData.question_3}
              onChange={(e) => updateFormData('question_3', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-300 text-lg mb-6"
            >
              <option value="">Выберите...</option>
              <option value="Творческий">Творческий</option>
              <option value="Аналитический">Аналитический</option>
              <option value="Общительный">Общительный</option>
              <option value="Спокойный">Спокойный</option>
              <option value="Активный">Активный</option>
            </select>

            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Дополнительные комментарии (необязательно)
            </h3>
            <textarea
              value={formData.question_4}
              onChange={(e) => updateFormData('question_4', e.target.value)}
              placeholder="Поделитесь своими мыслями..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-300 resize-none"
            />
          </QuestionCard>
        </div>

        {/* Навигационные кнопки */}
        <div className="flex justify-between mt-8">
          <AnimatedButton
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="secondary"
          >
            Назад
          </AnimatedButton>

          {currentStep === totalSteps ? (
            <AnimatedButton
              onClick={submitSurvey}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Завершить опрос'}
            </AnimatedButton>
          ) : (
            <AnimatedButton
              onClick={nextStep}
              disabled={!canProceed()}
            >
              Далее
            </AnimatedButton>
          )}
        </div>

        {isSubmitting && (
          <div className="mt-8">
            <LoadingSpinner />
            <p className="text-center text-gray-600 mt-4">
              Сохраняем ваши ответы...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}