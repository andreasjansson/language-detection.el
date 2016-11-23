using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

class Day08
{
	static void Main()
	{
		var lines = File.ReadAllLines("input.txt");
		var sum = 0;
		foreach(var line in lines)
		{
			// I just wanted to compare aggregate version with plain while-loop version of this task.
			// As for me aggregate-version is more complicated and harder to read.
			int chars = line.Aggregate(
				new {slash=false, toSkip=0, count=0}, 
				(state, c) => {
					if (state.slash) return new {slash=false, toSkip=c=='x'?2:0, count=state.count};
					if (state.toSkip > 0) return new {slash=false, toSkip=state.toSkip-1, count=state.count};
					return new {slash=c=='\\', toSkip=0, count=state.count+1};
			}).count - 2; // minus two quotation characters
			sum += line.Length - chars;
			Console.WriteLine(line + " " + chars); //Debug output
		}
		Console.WriteLine(sum);
	}
}
