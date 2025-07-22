const ERROR_MESSAGES = {
  internalError: 'На сервере произошла ошибка',
  notValid: 'Переданы некорректные данные.',
  userNotFound: 'Пользователь не найден.',
  cardNotFound: 'Карточка не найдена.',
  passwordOrEmailIncorrect: 'Неверно указаны почта или пароль',
  authRequired: 'Необходима авторизация',
  invalidToken: 'Недействительный токен',
  notFound: 'Запрашиваемый ресурс не найден',
  userAlreadyExists: 'Пользователь с таким email уже существует',
  forbiddenDelete: 'Нельзя удалить чужую карточку',
};

export default ERROR_MESSAGES;
