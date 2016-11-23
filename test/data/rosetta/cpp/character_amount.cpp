/*
Write a program that opens a text file, reads it character-by-character to the end of the
file, and reports the number of characters in the file.
*/

#include <iostream>
#include <string>
#include <fstream>
#include <cstdlib>
using namespace std;

int main()
{
	string name;
	int num_ch = 0;
	char ch;
	ifstream inFile;

	cout << "Enter the name of the file (ex. file.txt): ";
	cin >> name;
	
	inFile.open(name);

	if(!inFile.is_open())
	{	
		cout << "Couldn't open the file. Maybe you misspelled the name?" << endl;
		exit(EXIT_FAILURE);
	}
	else if(inFile.fail())
		cout << "Input terminated by data mismatch. \n";
	else
	{
		inFile >> ch;
		while(inFile.good())
		{
			++num_ch;
			inFile >> ch;
		}
	}

	cout << "There are " << num_ch << " characters in " << name << endl;

	return 0;
}