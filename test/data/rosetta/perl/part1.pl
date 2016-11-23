#!perl
use strict;
use warnings;
# - 
# Advent of Code 
# Solution Day-Part 11-2
# NOTES: 
#  -> Can not contain (i,o,l)
#  -> Streak of 3 characters in password (abc,stu)
#  -> Two different character pairs (aa,bb)
#  -> Increment current password 1 step starting from right->left
#  -> Test requirements after each increment
# - 
my($inp) = "vzbxkghb";                 # Current password(puzzle input)
my(@arr) = ("a".."z");                  # alphabet array
my(%ltrs) = ();                         # Letter/value hash
my($i) = 1;                             # Hash letter counter
my($rm) = 0;                            # Requirements met flag
my($ns) = "";                           # Init new string
my($t) = 0;                             # Changes counter
my(@tmp) = ();
$ns = $inp;
while($rm != 1){                        # Requirements not yet met
  $t++;                                 # Iterate change counter
  $ns++;                                # Increment next character in password
  $rm += reqChk($ns);                   # Check requirements
}  
print "\n\n Complete!\n\n";
print " Old password: ".$inp."\n";
print " New password: ".$ns."\n";
print " Iterations:   ".$t."\n\n";

# - Determine if all password requirements are met
sub reqChk{
  my($pass) = shift;                    # Passed parameter
  my($z) = 0;                           # Return status flag
  # Does not contain (i,o,l)
  if(!($pass =~ m/(i|o|l)/)){    
    # Contains sequence of 3 characters
    my(@str) = split("",$pass);         # Split string into char array
    for (my $i = 0; $i <= $#str; $i++){ # Each character in string
      if($i <= ($#str-2)){              # Not end of string and 2 characters left
        my($chr) = $str[$i];            # Seed character
        my($p2);                        # Init
        # Doing things this way forces you to check for z(as incrementing z does not return a)
        if($chr eq "z"){                # Check for z
          $p2 = "a";                    # Beginning  
        } else {
          $p2 = ++$str[$i];             # First increment
        }
        my($p3);                        # Init 
        if($p2 eq "z"){                 # Check for z
          $p3 = "a";                    # Beginning
        } else {          
          $p3 = ++$str[$i];             # Second increment  
        }
        # 3 character row sequence check
        if($p2 ne "z" || $p3 ne "a"){   # Do not allow sequence overrun (yza)
          if($p2 eq $str[$i+1] && $p3 eq $str[$i+2]){ # Sequence found
            # Password has 2 pairs of duplicating characters(final requirement)
            my(@prs) = $pass =~ /(.)\1/g; # Get pairs of characters found     
            my %prsfnd = map { $_ => 1 } @prs;  # Fill hash with pairs found(not unique)
            if(keys %prsfnd >= 2){      # Unique pairs found (atleast two)
              $z = 1;                   # Set return status to passed
            }
          } 
        }
      }
    }
  }
  return $z;                            # Return requirement status
}