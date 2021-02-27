import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {

  // 1 2 3 4 5 6 7 8 9 10
  // Detratores => 0-6
  // Passivos => 7-8
  // Promotores => 9 - 10
  //
  // (n de promotores - n de detratores) / (n de respondentes) * 100

  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    });

    const detractor = surveysUsers.filter(
        survey => survey.value >= 0 && survey.value <= 6
      ).length;

    const promoters = surveysUsers.filter(
      survey => survey.value >= 9
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

    return response.json({
      detractor,
      promoters,
      totalAnswers,
      nps: calculate
    })
  }
}

export { NpsController };
