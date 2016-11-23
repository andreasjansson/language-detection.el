-module(part2).
-export([main/0, next_str/1]).

-define(LSEQ, "(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)").

main() ->
	Str = "vzbxkghb",
	Next = find_next(Str),
	NextNext = find_next(next_str(Next)), % Have to initially increment or else we return early
	io:format("~p~n", [NextNext]).

find_next(Str) ->
	case has_iol(Str) of
		true -> find_next(next_str(Str));
		false -> 
			case re:run(Str, ?LSEQ) of
				{match, _} ->
					case re:run(Str, "(.)\\1.+(.)\\2") of
						{match, _} -> Str;
						_ -> find_next(next_str(Str))
					end;
				_ -> find_next(next_str(Str))
			end
	end.

has_iol(Str) ->
	lists:member($i, Str) or lists:member($o, Str) or lists:member($l, Str).

next_str(Str) ->
	lists:reverse(get_next(lists:reverse(Str))).

get_next([$z|T]) -> [$a|get_next(T)];
get_next([H|T]) -> [H+1|T].
