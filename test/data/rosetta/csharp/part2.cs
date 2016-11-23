using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.IO;
using System.Linq;
using System.Text;

public class Day06
{
	public static void Main()
	{
		var cmds = new Dictionary<string, Func<int, int>>{
			//Part1
			//{"turn on", x => 1},
			//{"turn off", x => 0},
			//{"toggle", x => 1-x},
			//Part2:
			{"turn on", x => x+1},
			{"turn off", x => Math.Max(0, x-1)},
			{"toggle", x => x+2},
		};
		// Idea of this solution:
		// make a lazy sequence of tuples (x, y, change), and apply them to bulbs map during the enumeration.
		var map = new int[1000,1000];
		var effects = 
			from line in File.ReadLines("input.txt")
			let change = cmds.First(c => line.StartsWith(c.Key)).Value
			let splitted = line.Split(' ')
			let p1=splitted[splitted.Length-3].Split(',').Select(int.Parse).ToList()
			let p2=splitted[splitted.Length-1].Split(',').Select(int.Parse).ToList()
			from x in Enumerable.Range(p1[0], p2[0]-p1[0]+1)
			from y in Enumerable.Range(p1[1], p2[1]-p1[1]+1)
			select map[x,y]=change(map[x, y]);
		effects.Count(); //force to enumerate lazy sequence
		Console.WriteLine(map.Cast<int>().Sum()); //Cast converts int[,] to IEnumerable<int>
	}
}