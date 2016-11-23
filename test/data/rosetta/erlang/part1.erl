-module(part1).
-export([main/0]).
-import(lists, [unzip/1]).
-import(binary, [split/3]).
-import(string, [strip/3]).

main() ->
	{ok, Data} = file:read_file("input"),
	{Lines, FLines} = gather_lines(Data),
	C1 = count_chars(Lines, fun(X) -> length(X) end), 
	C2 = count_chars(FLines, fun(X) -> esc_length(X) end),
	io:format("~p~n", [C1-C2]).

%% Counts characters in a list
count_chars(L, Fun) ->
	lists:foldl(fun(X, Sum) -> 
		Fun(X) + Sum 
	end, 0, L).

%% This crazy bit does a list comprehension to get 2 things-
%% 1) List representation of the binary
%% 2) Same thing but with the "'s on the end removed
gather_lines(Data) ->
	unzip([
		   {binary_to_list(Y), strip(binary_to_list(Y), both, $")} 
		   || Y <- [Str || Str <- split(Data, [<<"\n">>], [global]) -- [<<>>]]
		  ]).

%% Accounts for escape sequences
esc_length(L)                      -> esc_length(L, 0).
esc_length([], Acc) 			   -> Acc;
esc_length([$\\,$x,_X1,_X2|T],Acc) -> esc_length(T,Acc+1);
esc_length([$\\,$\\|T],Acc)        -> esc_length(T,Acc+1);
esc_length([$\\,$"|T],Acc)         -> esc_length(T,Acc+1);
esc_length([_|T],Acc)              -> esc_length(T,Acc+1).
