package cz.cvut.fel.nutforms.rules;

import cz.cvut.fel.nutforms.rules.entity.UserEntity;
import org.junit.Before;
import org.junit.Test;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.StatelessKieSession;
import static org.junit.Assert.*;

/**
 * Test for {@link UserEntity} related Drools rules.
 */
public class UserEntityRulesTest {

    private StatelessKieSession kieSession;

    @Before
    public void setUp() throws Exception {
        // KieSession creation
        KieServices kieServices = KieServices.Factory.get();
        KieContainer kieContainer = kieServices.getKieClasspathContainer();
        kieSession = kieContainer.newStatelessKieSession("ksession1");
    }

    @Test
    public void testIsAdult() {
        //toDo: should be testing only one specific rule
        UserEntity userEntity = new UserEntity();
        userEntity.setAge(11);

        assertFalse(userEntity.isValid());
        // Apply business rules
        kieSession.execute(userEntity);
        assertFalse(userEntity.isValid());
        userEntity.setAge(18);
        kieSession.execute(userEntity);
        assertTrue(userEntity.isValid());
    }

//    public void testPasswordLongEnough() {
//        UserEntity userEntity = new UserEntity();
//        userEntity.setAge(18);
//        userEntity.setUsername("ondrak");
//        userEntity.setPassword("password");
//
//        assertFalse(userEntity.isValid());
//        kieSession.execute(userEntity);
//    }
}
