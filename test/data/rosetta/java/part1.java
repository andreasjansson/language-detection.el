import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class part1 {
	private static Map<String, String> strings = new HashMap<String, String>();
	private static Map<String, Integer> values = new HashMap<String, Integer>();

	public static void main(String[] args) {

		try (BufferedReader br = new BufferedReader(new FileReader(new File("input.txt")))) {
			String line;
			while ((line = br.readLine()) != null) {
				// separate the variable from its gate
				strings.put(line.split("->")[1].trim(), line.split("->")[0].trim());
			}
			// start of the computation with one call to getValue
			values.put("a", getValue("a", strings.get("a")));

			// print the answer
			System.out.println(values.get("a"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Recursive method fetching values for variables found in string s
	 * @param key For what key we need the value
	 * @param gate The gate
	 * @return return A new Integer containing the value for the key
	 */
	private static Integer getValue(String key, String gate) {
		String var1 = null;
		String var2;
		int i1 = 0;
		int i2 = 0;
		String[] vars = gate.split(" ");

		if (vars.length == 3) {// if the gate is in format "var1 OPERATION var2"
			var1 = vars[0];
			var2 = vars[2];
			if (isNumeric(var1)) {
				i1 = Integer.parseInt(var1);
			} else {
				if (values.get(var1) == null) {
					values.put(var1, getValue(var1, strings.get(var1)));
				}
				i1 = values.get(var1);
			}
			if (isNumeric(var2)) {
				i2 = Integer.parseInt(var2);
			} else {
				if (values.get(var2) == null) {
					values.put(var2, getValue(var2, strings.get(var2)));
				}
				i2 = values.get(var2);
			}
		} else if (vars.length == 2) {// if the gate is in format "OPERATION var1"
			var1 = vars[1];
			if (isNumeric(var1)) {
				i1 = Integer.parseInt(var1);
			} else {
				if (values.get(var1) == null) {
					values.put(var1, getValue(var1, strings.get(var1)));
				}
				i1 = values.get(var1);
			}
		} else if (vars.length == 1) {// if the gate is in format "var1"
			var1 = gate.trim();
			if (isNumeric(var1)) {
				i1 = new Integer(var1);
			} else {
				if (values.get(var1) == null) {
					i1 = new Integer(getValue(var1, strings.get(var1)));
				}
				i1 = values.get(var1);
			}
		}
		// proceding to the calculations with the right integers
		if (gate.contains("AND")) {
			return new Integer(i1 & i2);
		} else if (gate.contains("OR")) {
			return new Integer(i1 | i2);
		} else if (gate.contains("NOT")) {
			return new Integer(~i1);
		} else if (gate.contains("LSHIFT")) {
			return new Integer(i1 << i2);
		} else if (gate.contains("RSHIFT")) {
			return new Integer(i1 >> i2);
		} else {
			return new Integer(i1);
		}
	}

	/**
	 * Checks if the string is numeric
	 * @param s The string
	 * @return true if the string is numeric
	 */
	public static boolean isNumeric(String s) {
		return s.matches("[-+]?\\d*\\.?\\d+");
	}
}
