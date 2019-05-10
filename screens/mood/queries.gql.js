import gql from 'graphql-tag';

const moods = gql`
  query moods {
    moods(
      where: { date_gte: "2019-03-01", date_lte: "2019-03-30" }
      orderBy: date_ASC
    ) {
      id
      type
      date
    }
  }
`;

export default { moods };
