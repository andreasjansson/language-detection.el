using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.IO;
using System.Linq;
using System.Text;

public class Day05
{
	public static void Main()
	{
		var words = Enumerable.Range(0, int.MaxValue)
			.Select(i => Console.ReadLine()).TakeWhile(s => s!=null).ToList();
		var niceWords = words.Where(w => 
			w.Count(c => "aeiou".Contains(c)) >= 3 
			&& q.Zip(w.Skip(1), (c1, c2) => c1 == c2)).Any()
			&& !new[]{"ab", "cd", "pq", "xy"}.Any(w.Contains)
			);
		Console.WriteLine(niceWords.Count());
	}
}