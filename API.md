# API
| 기능 | 메소드 | 엔드포인트 |
| --- | --- | --- |
| 공개투표 리스트 전체 조회(READ) | GET | /voteroom |
| 공개투표 1개 조회(READ) | GET | /voteroom/:id |
| 비공개 투표 1개 조회(READ) | POST | /voteroom/:id |
| 새 투표 생성(CREATE) | POST | voteroom/post |
| 투표 항목에 투표 (UPDATE) | PATCH | /voteroom/:id/vote |
| 투표 기간 종료 시 투표 삭제(DELETE) | DELETE | /voteroom/:id/delete |
| 투표 기간 종료 시 이메일 설정했다면 이메일 전송(Gmail API 이용) | POST | DELETE 실행 시 함께 실행 |

```json
// GET /votelist
// 공개투표 리스트 전체 조회 응답 바디
res body
[
	{
		"id": "1",
		"title": "점심메뉴",
	  "choice_list": {
					"돼지국밥": 1,
					"김치찌개": 3
		}
	  "multi_choice": true,
	  "startDate": 2022-03-03,
	  "periodDay": 1
	}
]
```
```json
// GET /votelist/:id
// 공개 투표 1개 조회 응답 바디
res body
{
	"id": "1",
	"title": "점심메뉴",
  "choice_list": {
				"돼지국밥": 1,
				"김치찌개": 3
	}
  "multi_choice": true,
  "startDate": 2022-03-03,
  "periodDay": 1
}
```
```json
// POST /votelist/:id
// 비공개 투표 1개 조회 요청 바디
req body
{
	"password": 1234
}
// 비공개 투표 1개 조회 응답 바디
// 비밀번호 일치 시(성공)_
res body
{
	"vote_id": "1",
	"title": "점심메뉴",
  "choice_list": {
				"돼지국밥": 1,
				"김치찌개": 3
	},
  "multi_choice": true,
  "startDate": 2022-03-03,
  "periodDay": 1
}
// 비밀번호 불일치 시 404
{
	"Error": "Not Found"
}
```
```json
// POST /post/vote
// 새 투표 생성 요청 바디
req body
{
	"private": true // private이 true이면 비공개 투표, false이면 공개투표
	"title": "점심메뉴",
	" password" : "1234",
  "choice_list": {
				"돼지국밥": 1,
				"김치찌개": 3
	}
  "multi_choice": true,
	"password": 1234,
  "startDate": 2022-03-03,
  "periodDay": 1,
	"email": null
}
// POST /new/private
// 새 투표 생성 요청 응답
res body
{
	"id": "1",
	"title": "점심메뉴",
	"password" : "1234",
  "choice_list": {
				"돼지국밥": 1,
				"김치찌개": 3,
	}
  "multi_choice": true,
  "startDate": 2022-03-03,
  "periodDay": 1,
	"email": null
}
```
```json
// PATCH /votelist/:id/vote
// 투표 항목에 투표 요청 바디
req headers
{
  "authorization": "authorization token"
}
req body
{
	"choice_list": {
			"돼지국밥": 1,
			"김치찌개": 4
	}
}
// 투표 항목에 투표 응답 바디
res body
{
	"title": "점심메뉴",
  "choice_list": {
				"돼지국밥": 1,
				"김치찌개": 4
	}
  "multi_choice": true,
  "startDate": 2022-03-03,
  "periodDay": 1
}
// 헤더에 토큰이 없을때
res body
{
  "message":"토큰이 없습니다."

}
//잘못된 토큰
res body
{
	"message": "잘못된 토큰입니다.",
	
}
// 이미 투표한 경우
res body
{
	"message":"재투표할 수 없습니다."
}
```
```json
// DELETE /votelist/:id/delete
// 투표 기간 종료 시 투표 삭제 응답 바디
res body
{
	"id": "1",
	"title": "점심메뉴",
  "choice_list": {
				"돼지국밥": 1,
				"김치찌개": 4
	}
  "multi_choice": true,
  "startDate": 2022-03-03,
  "periodDay": 1
}
```