#!perl -w
use strict;
use warnings;
# - 
# Advent of Code 
# Solution Day-Part 1-2
# - 
my($inf) = "input.txt";       # Input path/filename
my($i,$p) = 0;                # Floor counter (Challenge answer,position counter)
open(my $IN,"<",$inf)         # Open input file
  or die "Unable to open input file!\n";
my($ins) = <$IN>;             # Read first line of file(in this case, the entire file)
close($IN);                   # Close input file
my(@ca) = split("",$ins);     # Split into character array
foreach(@ca){                 # Each character
  $p++;                       # Increment position
  if($_ eq "("){              # Up one floor
    $i++;                     # Increment
  } elsif($_ eq ")"){         # Down one floor
    $i--;                     # Decrement
  }
  if($i == -1){               # In basement 
    print "In basement! - Position: ".$p."\n"; # Output position
    last;                     # Break out of loop
  }
}