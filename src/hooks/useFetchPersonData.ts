// TODO: set it up

// export default function useFetchPersonData({
//   activeNameID, prevActiveNameID
// }) {

//   useEffect(() => {
//     if (prevState && prevState.activeNameID && activeNameID !== prevState.activeNameID) {
//       dispatch(fetchNameCredits())
//       axios
//         .all([
//           axios.get(`${API_ROOT}/person/${activeNameID}?api_key=${process.env.MDB_API_KEY}&language=en-US`),
//           axios.get(`${API_ROOT}/person/${activeNameID}/combined_credits?api_key=${process.env.MDB_API_KEY}&language=en-US`)
//         ])
//         .then(
//           axios.spread((details, credits) => {
//             const filteredCast = makeFilteredData({ data: credits.data.cast, type: 'cast' })
//             const filteredCrew = makeFilteredData({ data: credits.data.crew, type: 'crew' })
//             dispatch(
//               fetchNameCreditsSuccess({
//                 details: details.data,
//                 credits: {
//                   cast: makeUniqData({ data: filteredCast, type: 'cast' }),
//                   crew: makeUniqData({ data: filteredCrew, type: 'crew' })
//                 }
//               })
//             )
//           })
//         )
//     }
//   })
// }
